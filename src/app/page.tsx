import Image from 'next/image';

import imageBackground from '@/assets/images/login-image-background2.jpg';
import frame from '@/assets/images/login-frame.png';

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-[480px] flex items-center justify-center">
        formulario
      </div>
      <aside className="bg-slate-200 flex-1 relative">
        <figure>
          <Image src={imageBackground} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-blue-900/40" />
          <figure className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <Image
              src={frame}
              alt=""
              fill
              className="object-cover opacity-90"
            />
          </figure>
        </figure>
      </aside>
    </div>
  );
}
