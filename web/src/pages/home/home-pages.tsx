import { MyLinks } from "@/features/create-link/components/my-links";
import { NewLink } from "@/features/create-link/components/new-file";
import LogoIcon from "@/assets/Logo_Icon.svg";

export function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center">
      <div className="mb-8 flex w-full justify-center gap-2 lg:justify-start">
        <img
          src={LogoIcon}
          className="select-none"
          width="26.67"
          height="22.67"
          alt="site logo"
        />
        <h3 className="text-blue-base font-family-quicksand text-[18.67px] font-bold">
          brev.ly
        </h3>
      </div>

      <section className="flex w-full flex-col gap-5 lg:flex-row lg:items-start">
        <NewLink />

        <MyLinks />
      </section>
    </div>
  );
}
