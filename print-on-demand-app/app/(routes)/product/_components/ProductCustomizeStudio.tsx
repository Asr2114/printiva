'use client'

import { Product } from '@/app/_components/PopularProducts'
import { imagekit } from '@/lib/ImageKitInstance'
import { Canvas, FabricImage } from 'fabric'
import ImageKit from 'imagekit'
import { CropIcon, Dice1, Dice1Icon, Dice2, Dices, ImageOff, ImageOffIcon, ImageUpscaleIcon, Layers, Paintbrush, UploadIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    product: Product
    setDesignUrl: any
}

//const DEFAULT_IMAGE = 'https://ik.imagekit.io/asr21/logo3.svg?updatedAt=1754400114610'
const DEFAULT_IMAGE = 'https://ik.imagekit.io/asr21/1746087537159.jpeg?updatedAt=1754470794506'

const AiTransformOptions = [
    {
    name:'BG Remove',
    icon:ImageOff,
    imageKitTr:'e-bgremove'
    },
    {
        name:'Upscale',
        icon:ImageUpscaleIcon,
        imageKitTr:'e-upscale'
        },
        {
            name:'Smart Crop',
            icon:CropIcon,
            imageKitTr:'fo-auto'
            },
            {
                name:'Shadow',
                icon:Layers,
                imageKitTr:'e-shadow'
                },
                {
                    name:'Retouch',
                    icon:Paintbrush,
                    imageKitTr:'e-retouch'
                    }
                  
                

]

function ProductCustomizeStudio({ product , setDesignUrl}: Props) {

    const canvasRef = useRef<any>(null);
    const [canvasInstance, setCanvasInstance] = useState<any>(null);
    const [uploadedImage, setUploadedImage] = useState<string>(DEFAULT_IMAGE);

    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 200,
                height: 200,
                backgroundColor: 'transparent'
            })
            initCanvas.renderAll();
            setCanvasInstance(initCanvas);

            return () => {
                initCanvas.dispose();
            }
        }



    }, [])

    useEffect(() => {
        if (canvasInstance) {
            AddDefaultImageToCanvas();
            setDesignUrl(uploadedImage);
        }

    }, [canvasInstance, uploadedImage])

    const AddDefaultImageToCanvas = async () => {
        canvasInstance.clear();
        canvasInstance.renderAll();
        const canvasImageRef = await FabricImage.fromURL(uploadedImage);
        canvasImageRef.scaleX = 0.5;
        canvasImageRef.scaleY = 0.5;
        canvasInstance.add(canvasImageRef);

        canvasInstance.renderAll();
    }

    const onHandleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        //GET File
        const file = event.target.files?.[0];


        //Upload to ImageKit

        if (file) {
            const uploadImageRef = await imagekit.upload({
                //@ts-ignore
                file: file,
                fileName: file?.name,
                isPublished: true,
                useUniqueFileName: false

            });



            //Show to canvas
            //@ts-ignore
            const uploadedImageUrl = uploadImageRef?.url;

            if (uploadedImageUrl) {
                setUploadedImage(uploadedImageUrl);
                canvasInstance.clear();
                canvasInstance.renderAll();
                const canvasImageRef = await FabricImage.fromURL(uploadedImageUrl);
                canvasImageRef.scaleX = 0.1;
                canvasImageRef.scaleY = 0.1;
                canvasInstance.add(canvasImageRef);

                canvasInstance.renderAll();

            }

        }

    }

    const OnApplyAiTransformation=(transformation:any, add:boolean)=>{
      if(add){
        if(uploadedImage?.includes('&tr=')){
              const newUrl = uploadedImage+transformation+','
              setUploadedImage(newUrl);

        } else{
            const newUrl = uploadedImage+'&tr='+transformation+','
              setUploadedImage(newUrl);

        }
    } else{
        const newUrl = uploadedImage.replace(transformation, '');
              setUploadedImage(newUrl);
    }

    }

    const isTransformationApplied=(transformation:string)=>{
        return uploadedImage?.includes(transformation)?false:true;

    }


    return (

        <div className='flex items-center flex-col border rounded-2xl'>
            <div className='flex items-center flex-col h-[400px] w-[400px]'>
                <canvas
                    id='canvas'
                    ref={canvasRef}
                    className='absolute top-0 left-0 z-10 mt-60 border rounded-2xl border-dashed'


                />

                <Image src={product?.productimage[0]?.url}
                    alt={product?.title}
                    width={500}
                    height={500}
                    className="rounded-xl shadow-lg object-cover"
                />


            </div>






            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-10 w-full max-w-4xl px-4 mt-60
                '>
                <label htmlFor='uploadImage'>
                    <div className='flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-pointer border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-center'>
                        <UploadIcon />
                        <h2>
                            Upload Image
                        </h2>
                        <input type='file' id='uploadImage' className='hidden' onChange={onHandleImageUpload} />
                    </div>
                </label>

                {AiTransformOptions.map((item,index)=>(
                     <div key={index} className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-pointer border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-center ${uploadedImage.includes(item.imageKitTr)?'border-primary':null}`}
                     onClick={()=> OnApplyAiTransformation(item?.imageKitTr, isTransformationApplied(item.imageKitTr))}
                     >
                     <item.icon />
                     <h2 className='text-center'>
                         {item.name}
                     </h2>
                 </div>


                ))}
                 <div className='flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-not-allowed border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-center'
                     
                     >
                     <Dices />
                     <h2 className='text-center'>
                         AI Image
                     </h2>
                 </div>

                 <div className='flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg cursor-not-allowed border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-center'
                     
                     >
                     <ImageOffIcon />
                     <h2 className='text-center'>
                         AI Background
                     </h2>
                 </div>
               
              

            </div>
        </div>

    )
}

export default ProductCustomizeStudio