/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function GET(request: Request) {
  try {
    const exoBold = await readFile(
      join(process.cwd(), 'src/assets/fonts/Exo/Exo-Bold.ttf'),
    );

    const params = null;

    if (!params) {
      return new ImageResponse(
        (
          <div
            style={{
              backgroundColor: '#1a75bb',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: 20,
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <img
                width="151"
                height="60"
                src="https://api.francavenda.com.br/images/logotipo-darkmode.png"
                alt=""
              />
            </div>
            <div
              style={{
                color: '#ffffff',
                display: 'flex',
                alignItems: 'flex-end',
                gap: 16,
              }}
            >
              <figure>
                <img
                  width="196"
                  height="160"
                  src="https://i.postimg.cc/sgHjvx2z/user-laptop.png"
                  alt=""
                />
              </figure>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: 8,
                }}
              >
                {/* <span style={{ color: '#f7d80e' }}>Olá, Matheus.</span> */}
                <span>Seja bem vindo ao nosso</span>
                <h2
                  style={{
                    margin: 0,
                    padding: 0,
                    lineHeight: 1,
                    fontSize: 24,
                    textTransform: 'uppercase',
                  }}
                >
                  Escritório Virtual
                </h2>
              </div>
            </div>
          </div>
        ),
        {
          width: 526,
          height: 275,
          fonts: [
            {
              name: 'Exo',
              data: exoBold,
              style: 'normal',
              weight: 700,
            },
          ],
        },
      );
    }
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
