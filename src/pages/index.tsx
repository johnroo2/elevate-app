import { CSSProperties, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

export default function Index({ displayData, setDisplayData }: any) {
  const [input, setInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#0ea5e9",
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://127.0.0.1:5000",
        { input: input }).then(res => res.data)
        .catch(err => console.log(err))
      setDisplayData(response)
      setLoading(false)
      router.push('/results')
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <main className="relative w-screen h-screen flex flex-col justify-center px-40">
      {loading &&
        <div className="absolute inset-0 w-full h-full bg-white/[0.7] flex items-center justify-center text-black text-7xl font-bold z-[500]">
          <ClipLoader
            color={"transparent"}
            loading={loading}
            cssOverride={override}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>}
      <div className="flex flex-col items-start gap-8 w-[70%] text-black" data-aos="fade-up">
        <TypeAnimation
          sequence={[
            "Type something...",
            3000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '3.75em', fontWeight: '700', display: 'inline-block', pointerEvents: "none" }}
          repeat={Infinity}
        />
        <Link className="mt-[-1.5rem] text-2xl ml-1 font-normal hover:underline hover:text-sky-700 transition underline"
          href="/info">
          Emotion detection using NLP-based sentiment analysis & transformer models
        </Link>
        <textarea className="p-8 text-2xl font-medium rounded-md h-[350px] max-h-[400px] min-h-[300px] 
        bg-sky-50/[0.8] w-full"
          maxLength={10000} value={input} onChange={e => { setInput(e.target.value) }}
          placeholder={'The sky is blue and the grass is green!'} />
        <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-md px-16 
          py-[0.35rem] text-2xl font-medium transition-all"
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </main>
  )
}
