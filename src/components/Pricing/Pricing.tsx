import { useTranslation } from 'react-i18next';
import { memo } from 'react';
//*Styles
import styles from './Pricing.module.css';
//*Components
import Title from '../Title/Title';
import Wrapper from '../Wrapper/Wrapper';
import PricingCard from '../PricingCard/PricingCard';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

type DataPropsType = {
  price: number;
  plan: string;
  text: string;
};

const Pricing = () => {
  const { t } = useTranslation();

  const plansList: DataPropsType[] = t('pricing', { returnObjects: true });

  return (
    <section>
      <Wrapper>
        <Title title={t('titlePricing')} subtitle={t('subTitle')} />
        <div className={styles.items}>
          {plansList.map((item, index) => (
            <AnimatedComponent>
              <PricingCard
                price={item.price}
                plan={item.plan}
                text={item.text}
                key={index}
              />
            </AnimatedComponent>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default memo(Pricing);
