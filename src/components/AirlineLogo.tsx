import Image from "next/image";

export const AirlineLogo = ({
    airlineCode,
    width = 200,
    height = 200,
}: {
    airlineCode: string;
    width?: number;
    height?: number;
}) => {
    return (
        <Image
            src={`http://pics.avs.io/${width}/${height}/${airlineCode}.png`}
            alt="Airline Logo"
            width={width}
            height={height}
        />
    );
};
