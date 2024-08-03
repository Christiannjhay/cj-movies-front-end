import logo from "../../images/logo.png";

export default function Logo() {
  return (
    <div className="w-fit h-fit m-4">
      <img src={logo} alt="Website Logo" className="w-[150px] h-[40px]" />
    </div>
  );
}
