import { useTranslation } from "@/hooks/useTranslation";

export const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <section className="text-center my-5">
      <h5 className="select-none">
        {t('footer_copyright', { suffix: "© 2024 David Chan." })}
      </h5>
    </section>
  );
};
