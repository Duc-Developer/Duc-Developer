import { useTranslation } from "@/hooks/useTranslation";
import { classNames } from "@/lib/utils";
import { useRouter } from "next/router";

export const Footer = () => {
  const { t } = useTranslation('common');
  const { pathname } = useRouter();
  const isPostContent = /\/blogs\/.*/.test(pathname);
  return (
    <section className={classNames(
      "text-center my-5",
      isPostContent ? "hidden sm:block" : "block"
    )}>
      <h5 className="select-none">
        {t('footer_copyright', { suffix: "© 2024 David Chan." })}
      </h5>
    </section>
  );
};
