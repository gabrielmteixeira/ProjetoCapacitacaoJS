/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

import MeusAlbuns from "views/MeusAlbuns";
import Login from "views/Login"

/*
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "",
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Login",
    icon: "nc-icon nc-single-02",
    component: UpgradeToPro,
    layout: "",
  },
];
*/

var allRoutes = [
  {
    pro: true,
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-single-02",
    component: Login,
    layout: "",
    render: ["visitante"],
  },
  {
    pro: true,
    path: "/login",
    name: "Logout",
    icon: "nc-icon nc-user-run",
    component: Login,
    layout: "",
    render: ["fa", "musico", "admin"]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "",
    render: ["visitante", "fa", "musico", "admin"]
  },
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-shop",
    component: Dashboard,
    layout: "",
    render: ["visitante", "fa", "musico", "admin"]
  },
  {
    path: "/buscar",
    name: "Buscar",
    icon: "nc-icon nc-zoom-split",
    component: TableList,
    layout: "",
    render: ["visitante", "fa", "musico", "admin"]
  },
  {
    path: "/carrinho",
    name: "Carrinho",
    icon: "nc-icon nc-cart-simple",
    component: Dashboard,
    layout: "",
    render: ["fa", "musico", "admin"]
  },
  {
    path: "/meus-albuns",
    name: "Meus Albuns",
    icon: "nc-icon nc-image",
    component: MeusAlbuns,
    layout: "",
    render: ["fa", "musico", "admin"]
  },
  {
    path: "/perfil",
    name: "Perfil",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "",
    render: ["fa", "musico", "admin"]
  },
  {
    path: "/minhas-producoes",
    name: "Minhas Produções",
    icon: "nc-icon nc-note-03",
    component: Dashboard,
    layout: "",
    render: ["musico", "admin"],
  }
]

export default allRoutes;
