import React, { useState, useEffect, useRef } from 'react';

// A custom hook for the counting animation
const useCountUp = (end: number, duration: number, start: boolean): number => {
    const [count, setCount] = useState<number>(0);
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        if (!start) return;

        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(end * progress);
            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(end); // Ensure it ends on the exact number
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [start, end, duration, totalFrames]);

    return count;
};

// Interface for StatCard props
interface StatCardProps {
    value: number;
    label: string;
    startAnimation: boolean;
}

// A component for a single statistic
const StatCard: React.FC<StatCardProps> = ({ value, label, startAnimation }) => {
    const count = useCountUp(value, 2000, startAnimation);

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            const divided = num / 1000;
            // Use toFixed(1) for numbers like 2.5, and toFixed(0) for whole thousands
            return divided.toFixed(Number.isInteger(divided) ? 0 : 1) + 'K+';
        }
        return num + '+';
    };

    return (
        <div className="flex flex-col items-center justify-center py-2 md:p-8  rounded-2xl border  shadow-lg backdrop-blur-sm">
            <span className="text-3xl md:text-6xl lg:text-7xl font-bold text-black tracking-tighter">
                {formatNumber(count)}
            </span>
            <p className="mt-2 text-lg md:text-xl text-gray-300 font-medium">{label}</p>
        </div>
    );
};

// Interface for a single stat object
interface Stat {
    id: number;
    value: number;
    label: string;
}

// Main  Component
const Numbers: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const statsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is in view
            }
        );

        const currentRef = statsRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const stats: Stat[] = [
        { id: 1, value: 10000, label: 'Satisfied Customers' },
        { id: 2, value: 5000, label: 'Sofa Repaired' },
        { id: 3, value: 2500, label: 'Sofa Made' },
    ];

    return (
        <div className=" min-h-screen text-black font-sans">
           

            <main className="container mx-auto px-4">
                {/* Placeholder content to enable scrolling */}
              
                {/* The stats section that will be observed */}
                <section 
                    ref={statsRef} 
                    className={`py-10 transition-opacity duration-1000 ease-in ${isVisible ? '' : 'opacity-0'}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.id}
                                value={stat.value}
                                label={stat.label}
                                startAnimation={isVisible}
                            />
                        ))}
                    </div>
                </section>

                {/* More placeholder content */}
                <div className=""></div>
            </main>
        </div>
    );
}

export default Numbers;
