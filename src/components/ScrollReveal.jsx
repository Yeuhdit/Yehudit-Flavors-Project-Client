// react-client/src/components/ScrollReveal.jsx
import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    // מזהה מתי האלמנט נכנס לפריים
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // מספיק לגלות אותו פעם אחת כדי לא לעשות אנימציה הלוך ושוב
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 }); // 10% מהאלמנט צריך להיות במסך
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={domRef} 
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;