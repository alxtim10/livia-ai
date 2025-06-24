
interface HeroProps {
  username?: string,
  noka?: string
}

const Hero = ({username, noka}: HeroProps) => {
  return (
    <div>
      <img src="/images/livia.png" alt="" className="w-32" />
      <h1 className="mt-3 bg-gradient-to-r text-transparent inline-block bg-clip-text from-[#2D7FCA] via-[#9C51DA] to-[#CB6E7A] font-semibold">
        <span className="text-xl sm:text-2xl">Hi, Aku {username}!</span>
        <br />
        <span className="text-[16px]">
          {noka} bisa tanya aku apa saja terkait <br />
          kesehatan, gizi, atau gaya hidup sehat.
        </span>
      </h1>
    </div>
  )
}

export default Hero