// Demo usages of the ImageHover (image-reveal) component.
import { ImageHover } from '@/components/ui/image-reveal';
import awsCloudImageHorizontal from '@/assets/images/aws_cloud_horizontal.png';

const DemoOne = () => {
  return <ImageHover src={awsCloudImageHorizontal} alt="AWS cloud builder reveal" />;
};

export { DemoOne };
