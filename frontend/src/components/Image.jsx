import { IKImage } from 'imagekitio-react';

export const Image = ({ src, className, w, h, alt }) => {

    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            path={src === "" ? null : src}
            className={className}
            loading='lazy'
            lqip={{ active: true, quality: 20 }}
            alt={alt}
            width={w}
            height={h}
            transformation={[
               { 
                    width: w,
                    height: h,
                },
            ]}
        />
    )
}
