'use client';
import Lottie from 'lottie-react';
import underConstruction from '@/assets/lotties/construction.json';

export function UnderConstruction() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center">
      <figure className="w-[80%] max-w-[360px]">
        <Lottie animationData={underConstruction} />
      </figure>
      <div className="text-center xl:text-left flex flex-col gap-4">
        <h1 className="text-3xl text-slate-600 font-bold">
          Página em construção
        </h1>
        <p className="text-3xl text-slate-400 font-semibold">
          Esta página não está disponível no momento.
          <br />
          Mas estará em breve.
        </p>
      </div>
    </div>
  );
}
