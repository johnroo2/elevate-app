import Link from "next/link";

export default function Info(){
    return(
        <div className="relative w-screen h-screen flex flex-col items-center justify-center gap-4" data-aos="fade-up">
            <Link href="/" className="absolute top-6 left-6 bg-sky-600 hover:bg-sky-500 text-white rounded-md px-12
            py-[0.35rem] text-xl font-medium transition-all cursor-pointer">
                Home
            </Link>
            <div className="text-black text-6xl font-bold">
                About this model
            </div>
            <Link target="_blank" href="/model-architecture.png" 
            className="text-2xl hover:underline hover:text-sky-700 transition underline">
                LINK: See Model Architecture
            </Link>
            <Link target="_blank" href="https://www.kaggle.com/datasets/praveengovi/emotions-dataset-for-nlp" 
            className="text-2xl hover:underline hover:text-sky-700 transition underline">
                LINK: See Kaggle Dataset
            </Link>
            <div className="mt-4 text-2xl font-normal leading-10 text-center w-[900px]">
                This application uses transformer models to find and evaluate emotions in a span
                of text with over 97% accuracy. For architecture, I used three main kinds of layers:
                attention, feed-forward, and affine layers. First, the model&apos;s attention layer consists of 
                a Multi Head Attention layer followed by a Normalization layer. Next, I chose to use
                convolution layers in an attempt to form links between vectors. Finally, my affine layer
                consists of a simple, learnable affine transform. In addition, the head of the input and output 
                branches are characterized by embedding layers, which are used to process the vectorized text. 
            </div>
        </div>
    )
}