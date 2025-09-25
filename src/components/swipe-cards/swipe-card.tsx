import {
  motion,
  useAnimate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { BriefcaseBusinessIcon, MapPinIcon } from "lucide-react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import type { SwipeCardHandle, SwipeCardProps } from "./interfaces";

const SWIPE_THRESHOLD = 100;
const SWIPE_ANIMATION_CONFIG = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  duration: 0,
};

const SwipeCard = memo(
  forwardRef<SwipeCardHandle, SwipeCardProps>(
    ({ index, user, isFront, onSwipe }, ref) => {
      /** Hooks */
      const x = useMotionValue(0);
      const [scope, animate] = useAnimate();

      /** Transforms */
      const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
      const rotate = useTransform(x, [-150, 150], [-16, 16]);

      /** Memoized values */
      // const isFront = useMemo(() => {
      //   const lastIndex = cards.length - 1;
      //   return index === lastIndex;
      // }, [cards.length, index]);

      const handleDragEnd = useCallback(async () => {
        const currentX = x.get();
        if (Math.abs(currentX) > SWIPE_THRESHOLD) {
          const direction = currentX > 0 ? "right" : "left";
          await onSwipe(user, direction);
        }
      }, [x, onSwipe, user]);

      useImperativeHandle(
        ref,
        () => ({
          swipe: async (direction: "left" | "right") => {
            const finalX =
              direction === "left"
                ? -window.innerWidth * 1.2
                : window.innerWidth * 1.2;
            const thresholdX =
              direction === "left"
                ? -SWIPE_THRESHOLD - 20
                : SWIPE_THRESHOLD + 20;

            // Primeira fase: move até passar do threshold (simula o drag)
            await animate(x, thresholdX, {
              duration: 0.08,
              ease: "easeOut",
            });

            // Segunda fase: animação final para fora da tela (simula o release)
            await animate(
              scope.current,
              {
                x: finalX,
                rotate: direction === "left" ? -25 : 25,
                opacity: 0,
              },
              SWIPE_ANIMATION_CONFIG
            );

            // Executa o callback e remove o card
            await onSwipe(user, direction);

            // Reseta o MotionValue
            x.set(0);
          },
        }),
        [animate, scope, x, onSwipe, user]
      );

      const motionStyle = useMemo(
        () => ({
          x,
          opacity,
          rotate,
          gridRow: 1,
          gridColumn: 1,
          zIndex: `1${index}`,
        }),
        [x, opacity, rotate, index]
      );

      return (
        <motion.div
          ref={scope}
          drag={isFront ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          animate={{
            scale: isFront ? 1 : 0.95,
          }}
          transition={{ duration: 0.125 }}
          style={motionStyle}
          onDragEnd={handleDragEnd}
          className="relative mx-auto max-w-sm overflow-hidden p-4"
          layout={false}
          whileTap={isFront ? { scale: 0.98 } : undefined}
        >
          <div className="shadow-lg min-w-xs rounded-xl w-full bg-pink-50 relative max-sm:h-[75vh] min-sm:h-130">
            <div
              style={{
                backgroundImage: `url(${user.photos[0]})`,
              }}
              className={"shrink-0 rounded-t-xl bg-cover bg-center object-cover aspect-square h-1/2 w-full"}
            />

            <div className="p-4">
              {/* Name, Age, Distance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-pink-500">
                    <span className="text-xl font-bold">{user.name}</span>,
                    <span className="text-sm font-normal ml-1">{user.age}</span>
                  </h2>
                </div>

                <div className="text-pink-500 flex items-center gap-1">
                  <MapPinIcon size={16} />
                  <span className="text-sm">{user.distance}</span>
                </div>
              </div>

              {/* Profession */}
              <div className="flex items-center gap-1 font-medium text-sm mt-2">
                <BriefcaseBusinessIcon size={14} />
                {user.occupation}
              </div>

              {/* Description */}
              <div className="text-sm leading-relaxed mt-2">
                {user.description}
              </div>

              {/* Interests */}
              <div className="flex flex-wrap items-center gap-1 font-medium mt-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-pink-500 text-white text-xs px-2 py-1 rounded-lg"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
  )
);

SwipeCard.displayName = "SwipeCard";

export default SwipeCard;
