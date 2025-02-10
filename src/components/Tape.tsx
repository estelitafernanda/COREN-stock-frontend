import { Fragment } from "react";

const words = [
  "Assecível",
  "Seguro",
  "Alta Perfomance",
  "Interativo",
  "Responsivo"
]

export const Tape = () => {
  return (
    <div className="py-16 lg:py-24 overflow-x-clip" >
  
        <div className="bg-gradient-to-r -mb-10 to-primary  from-sky-400 opacity-40  rotate-6 -mx-1">
          <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"          >
            <div className="flex flex-none gap-4 py-3 pr-4" >
              {...new Array(2).fill(0).map((_, idx2)=> (
                <Fragment key={idx2}>

                {words.map((word) =>(
                  <div key={word} className="inline-flex items-center gap-4">
                    <span className="text-blackPrimary uppercase font-extrabold text-sm">{word}</span>
                    <div className='size-2 bg-blackPrimary rounded-full'></div>
                  </div>
                ))}
               </Fragment>
              ))}

            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r to-primary from-sky-400  -rotate-3 -mx-1">
          <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"          >
            <div className="flex flex-none gap-4 py-3 pr-4" >
              {...new Array(2).fill(0).map((_, idx)=> (
                <Fragment key={idx}>

                {words.map((word) =>(
                  <div key={word} className="inline-flex items-center gap-4">
                    <span className="text-blackPrimary uppercase font-extrabold text-sm">{word}</span>
                    <div className='size-2 bg-blackPrimary rounded-full'></div>
                  </div>
                ))}
               </Fragment>
              ))}

            </div>
          </div>
        </div>

    </div>
  );
};