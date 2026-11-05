import Image from "next/image";

type ProfilePortraitProps = {
  variant: "hero" | "about";
  priority?: boolean;
};

const portraitAlt =
  "Portrait of Muhammad Luqman, an Electrical Engineering graduate from Universitas Gadjah Mada.";

export function ProfilePortrait({ variant, priority = false }: ProfilePortraitProps) {
  const sizes =
    variant === "hero"
      ? "(max-width: 560px) 68vw, (max-width: 760px) 72vw, (max-width: 1080px) 300px, 330px"
      : "(max-width: 560px) 90vw, (max-width: 760px) 78vw, (max-width: 1080px) 36vw, 340px";

  return (
    <figure className={`profile-portrait profile-portrait--${variant}`}>
      <div className="profile-portrait__ambient" aria-hidden="true" />
      <div className="profile-portrait__frame">
        <Image
          src="/images/profile.jpeg"
          alt={portraitAlt}
          width={3024}
          height={4032}
          sizes={sizes}
          priority={priority}
          className="profile-portrait__image"
        />
        <span className="profile-portrait__veil" aria-hidden="true" />
        <div className="profile-portrait__caption">
          <span>Electrical Engineering / UGM</span>
          <strong>Muhammad Luqman</strong>
        </div>
      </div>
      {variant === "about" && (
        <figcaption className="profile-portrait__details">
          <span>Universitas Gadjah Mada</span>
          <span>Indonesia</span>
        </figcaption>
      )}
    </figure>
  );
}
