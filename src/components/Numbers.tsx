import React, { useState, useEffect, useRef } from 'react';
import { Users, Armchair, Hammer } from 'lucide-react'; // Example icons

// --- HOOKS ---
const useCountUp = (end: number, duration: number, start: boolean): number => {
    const [count, setCount] = useState<number>(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        if (!start) return;

        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            // Optional: Add an easing function here for smoother animation
            const progress = frame / totalFrames; 
            const currentCount = Math.round(end * progress);
            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(end);
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [start, end, duration, totalFrames]);

    return count;
};

// --- TYPES ---
interface StatCardProps {
    value: number;
    label: string;
    icon: React.ElementType; // Accept a component for the icon
    startAnimation: boolean;
    color: string; // Dynamic color for borders/icons
}

interface Stat {
    id: number;
    value: number;
    label: string;
    icon: React.ElementType;
    color: string;
}

// --- COMPONENTS ---

const StatCard: React.FC<StatCardProps> = ({ value, label, icon: Icon, startAnimation, color }) => {
    const count = useCountUp(value, 2000, startAnimation);

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            const divided = num / 1000;
            return divided.toFixed(Number.isInteger(divided) ? 0 : 1) + 'K+';
        }
        return num + '+';
    };

    return (
        <div className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2">
            {/* Decorative background blur blob */}
            <div className={`absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full opacity-10 blur-2xl ${color}`}></div>

            <div className="relative flex flex-col items-center justify-center text-center">
                {/* Icon Circle */}
                <div className={`mb-4 p-4 rounded-full bg-opacity-10 ${color.replace('bg-', 'bg-opacity-10 text-')}`}>
                    <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
                </div>
                
                {/* Number with Gradient */}
                <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 mb-2">
                    {formatNumber(count)}
                </span>
                
                {/* Label */}
                <p className="text-gray-500 font-medium text-lg uppercase tracking-wide">
                    {label}
                </p>
            </div>
        </div>
    );
};

const Numbers: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const statsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 } // Lowered threshold slightly for better mobile trigger
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const stats: Stat[] = [
        { 
            id: 1, 
            value: 10000, 
            label: 'Satisfied Customers', 
            icon: Users,
            color: 'bg-blue-600' 
        },
        { 
            id: 2, 
            value: 5000, 
            label: 'Sofas Repaired', 
            icon: Hammer,
            color: 'bg-orange-500' 
        },
        { 
            id: 3, 
            value: 2500, 
            label: 'Custom Sofas Made', 
            icon: Armchair,
            color: 'bg-emerald-500' 
        },
    ];

    return (
        <div className="bg-gray-50">
            <section ref={statsRef} className="py-20 md:py-32 container mx-auto px-4">
                {/* Section Header */}
                <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Trusted by Homeowners Everywhere
                    </h2>
                    <p className="text-lg text-gray-600">
                        We take pride in our craftsmanship. Here are the numbers that define our journey and dedication to quality service.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div 
                            key={stat.id}
                            className={`transition-all duration-1000 delay-[${index * 200}ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <StatCard
                                value={stat.value}
                                label={stat.label}
                                icon={stat.icon}
                                color={stat.color}
                                startAnimation={isVisible}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Numbers;