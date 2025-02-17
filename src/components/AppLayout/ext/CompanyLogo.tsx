import Image from 'next/image';

import logo from '@/assets/images/logo-francavenda-darkmode.png';

export async function CompanyLogo() {
  return (
    <figure className="flex h-32 justify-center items-center">
      <Image
        src={logo}
        width={150}
        height={60}
        priority={true}
        alt="Franca Venda"
      />
    </figure>
  );
}
