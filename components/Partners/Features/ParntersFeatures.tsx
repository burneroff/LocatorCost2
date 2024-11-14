import { Text, SimpleGrid, Container, rem } from '@mantine/core';
import { IconTruck, IconCertificate, IconCoin, IconLock, IconTag, IconClockHour10, IconRosetteDiscount } from '@tabler/icons-react';
import classes from './features.module.css';
import React from 'react';

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        <Icon style={{ width: rem(38), height: rem(38) }} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconLock,
    title: 'Безопасность',
    description:
      'Все наши сотрудники имеют большой опыт работы. Специалисты бережно относятся к вашим вещам и помогут организовать и осуществить квартирный переезд любой сложности',
  },
  {
    icon: IconClockHour10,
    title: '24 часа в сутки',
    description:
      'Мы предлагаем услуги перевозки грузов в любое время суток, обеспечивая удобство и доступность для наших клиентов.',
  },
  {
    icon: IconRosetteDiscount,
    title: 'Лучшие цены в Минске',
    description:
      'Мы работаем с физическими и юридическими лицами, используем наличный и безналичный расчет. Чтобы сохранить конкурентное преимущество, предлагаем одни из самых низких цен на рынке.',
  },
 
];

export function PartnersFeatures() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <div className={classes.wrapper}>
    <Container mt={30} mb={30} size="lg" >
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
    </div>
  );
}