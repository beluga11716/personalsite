import MistBackground from "@/components/ui/mist-background";
import { Typewriter } from "@/components/ui/typewriter";
import { Lens } from "@/components/ui/lens";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function App() {
  return (
    <>
      <MistBackground />

      <main className="relative z-10 min-h-svh flex flex-col items-center justify-center px-4 py-12 sm:py-20 gap-12 sm:gap-24">
        {/* ── Typewriter ── */}
        <section className="text-center w-full overflow-visible min-h-14 sm:min-h-10 md:min-h-16 lg:min-h-20">
          <Typewriter
            text={[
              "你那麼焦慮 和焦焦的烤肉有什麼區別 肯定很好吃，喜歡你",
              "你那麼能熬 和牛肉湯有什麼區別 肯定很好吃。喜歡你",
              "你那麼高冷 和冰淇淋有什麼區別 肯定很好吃，喜歡你",
              "你真好拿捏 和軟柿子有什麼區別 肯定很好吃，喜歡你",
              "你那麼脆弱 和蛋撻有什麼區別 肯定很好吃，喜歡你",
              "你過得那麼苦 和生巧克力有什麼區別 一定很好吃，喜歡你",
            ]}
            speed={100}
            className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white"
            waitTime={2000}
            deleteSpeed={30}
            cursorChar={"_"}
          />

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-8 sm:mt-12">
            <a
              href="https://github.com/beluga11716"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/30 text-zinc-300 hover:bg-zinc-700/40 hover:text-white hover:border-zinc-600 transition-all duration-200 backdrop-blur-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="mailto:ggbeluga11716@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/30 text-zinc-300 hover:bg-zinc-700/40 hover:text-white hover:border-zinc-600 transition-all duration-200 backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </a>
            <a
              href="https://t.me/+jjPi8QtiO2ZhMzE9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-800/30 text-zinc-300 hover:bg-zinc-700/40 hover:text-white hover:border-zinc-600 transition-all duration-200 backdrop-blur-sm"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              <span className="text-sm">Telegram</span>
            </a>
          </div>
        </section>

        {/* ── Lens Cards ── */}
        <section className="flex flex-wrap items-center justify-center gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="w-full max-w-96 shadow-none">
              <CardHeader className="p-0">
                <Lens zoomFactor={2} lensSize={220}>
                  <div className="w-full h-60 overflow-hidden rounded-t-xl">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Lens>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-2xl text-white">
                  {card.title}
                </CardTitle>
                <CardDescription className="mt-1">
                  {card.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="gap-3">
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" tabIndex={-1}>Visit</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
}

const cards = [
  {
    id: 0,
    title: "my blog",
    description:
      "隨筆、筆記、生活片段。記錄那些值得被記住的想法與瞬間。",
    url: "https://raynard.lol",
    image: "https://tu.raynard.lol/file/wallpaper/1781497514745.webp",
  },
  {
    id: 1,
    title: "Temporary email address",
    description:
      "臨時郵箱服務，保護你的真實郵箱不受垃圾郵件困擾。",
    url: "https://mail.raynard.lol/",
    image: "https://tu.raynard.lol/file/wallpaper/1781012326607.webp",
  },
  {
    id: 2,
    title: "imgbed",
    description:
      "輕量圖床服務，快速上傳與分享你的圖片，穩定可靠。",
    url: "https://tu.raynard.lol/",
    image: "https://tu.raynard.lol/file/wallpaper/1782213451787.webp",
  },
];

export default App;
