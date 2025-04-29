import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, StyledButton } from "./styles";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string>(location.pathname);

  const routes = [
    { name: "Add Borrower", route: "/" },
    { name: "Update Collection", route: "/addCollection" },
    { name: "Stats", route: "/stats" },
  ];

  const handleNavigation = (route: string) => {
    setActiveRoute(route);
    navigate(route);
  };

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  return (
    <Container>
      <span className="header">Demo working bank</span>
      <span className="subContainer">
        {routes.map((item) => (
          <StyledButton
            key={item.route}
            isActive={activeRoute === item.route}
            onClick={() => handleNavigation(item.route)}
          >
            {item.name}
          </StyledButton>
        ))}
      </span>
    </Container>
  );
}

export default Navigation;
