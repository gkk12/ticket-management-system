import HomeHeader from "../homeHeader";
import Footer from "../footer";
import { Container } from "@mui/material";

const Layout = ({ children }: JSX.ElementChildrenAttribute) => {
  return (
    <>
      <Container maxWidth="lg" style={{display:"flex", minHeight:"100vh", flexDirection:"column"}}>
        <HomeHeader />
        <>
        {children}
        </>
        <div style={{position:"sticky", bottom:0}}><Footer /></div>
      </Container>
    </>
  );
};

export default Layout;
