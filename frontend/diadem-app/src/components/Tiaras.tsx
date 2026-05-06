type TiaraProps = {
    size?: number;
    tiara: string; // путь к svg
  };
  
  export const Tiara = ({ size = 300, tiara }: TiaraProps) => {
    return <img src={tiara} style={{ width: size }} />;
  };