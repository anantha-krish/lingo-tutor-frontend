import data from "./data.json";

const SideBar = () => <>{data.name}</>;
export const LanguageDetail = () => {
  return (
    <>
      <SideBar />
      This is Langage Detail
    </>
  );
};
