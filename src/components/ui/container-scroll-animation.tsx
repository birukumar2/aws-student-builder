import React, { useRef } from 'react';
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion';

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.85, 0.95] : [1.02, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], isMobile ? [6, 0] : [14, 0]);
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -40] : [0, -80]);

  return (
    <div
      className="min-h-[52rem] md:min-h-[86rem] w-full flex items-start justify-center relative px-3 md:px-20 pt-16 pb-24 md:pt-24 md:pb-32"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-2 md:-mt-6 mx-auto w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="w-full overflow-hidden rounded-2xl bg-[#05070a] md:rounded-2xl md:p-6">
        {children}
      </div>
    </motion.div>
  );
};
