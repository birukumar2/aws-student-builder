// Demo usages of the SmoothCursor (smooth custom cursor) component.
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { CloudCursor } from '@/components/ui/cloud-cursor';

const DemoOne = () => {
  return <SmoothCursor cursor={<CloudCursor />} />;
};

export { DemoOne };
