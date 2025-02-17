'use client';
import { Card } from '.';

import styles from './CardLoader.module.css';

interface CardLoaderProps {
  text?: string;
}

export function CardLoader({ text }: CardLoaderProps) {
  return (
    <>
      <Card.Header>
        <div className="flex flex-col gap-1">
          <div className={`${styles.skeleton} w-[160px] h-4 rounded`} />
          <div className={`${styles.skeleton} w-[200px] h-2 rounded`} />
        </div>
      </Card.Header>
      <Card.Separator />
      <Card.Body>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-8">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[70%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[80%] h-4 rounded`} />
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[100%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[80%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[100%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[100%] h-4 rounded`} />
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[80%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[60%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[70%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[86%] h-4 rounded`} />
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-8">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[90%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[86%] h-4 rounded`} />
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[60%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[86%] h-4 rounded`} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <div className="flex flex-col gap-1">
              <div className={`${styles.skeleton} w-[100px] h-2 rounded`} />
              <div className={`${styles.skeleton} w-[86%] h-4 rounded`} />
            </div>
          </div>
        </div>
      </Card.Body>
    </>
  );
}
