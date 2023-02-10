interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps): JSX.Element => (
  <h1 className="text-3xl font-bold ">{title}</h1>
);

export default Title;
