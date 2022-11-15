import Head from 'next/head'
import { useEffect, useState } from 'react';
import CurrencyList from '../components/CurrencyList';
import Title from '../components/Title';

export default function Home() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://api.foxbit.com.br/');

    ws.addEventListener('open', () => {
      const payloadInstruments = {
        m: 0,
        i: 2,
        n: 'GetInstruments',
        o: JSON.stringify({ OMSID: 1 }),
      };
      ws.send(JSON.stringify(payloadInstruments));
    });

    ws.addEventListener('message', (response) => {
      const { n, o } = JSON.parse(response.data);
      const channel = n; // GetInstruments | SubscribeLevel1 | Level1UpdateEvent
      const data = JSON.parse(o);

      if (channel === 'GetInstruments') {
        console.log(data);
        setCurrencies(data);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Foxbit - Frontend Challenge</title>
        <meta name="description" content="Foxbit frontend challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title>Foxbit - Frontend Challenge</Title>
        <CurrencyList currencies={currencies} />
      </main>
    </div>
  )
}
