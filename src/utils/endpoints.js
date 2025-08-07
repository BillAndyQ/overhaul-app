const URL_FRONT = process.env.NEXT_PUBLIC_APP_URL;
const URL_BACKEND = `${URL_FRONT}/api`;
const URL_AUTH = `${URL_FRONT}/auth`

// Roles
const admin = "admin";
const contador = "contador";
const inspector = "inspector";
const gerente = "gerente";
const all = [admin, contador, inspector, gerente]

const PATH_FRONT = {
  ot_equipos: {
    url : `${URL_FRONT}/ot-equipos`,
    roles : all,
    label : "OT Equipos"
  },
  ot_personas : {
    url : `${URL_FRONT}/ot-personas`,
    roles : all,
    label : "OT Personas"
  },
  facturas : {
    url : `${URL_FRONT}/facturas`,
    roles : [contador],
    label : "Facturas"
  },
  empresas : {
    url : `${URL_FRONT}/empresas`,
    roles : [admin, contador, gerente],
    label : "Empresas"
  },
  cursos : {
    url : `${URL_FRONT}/cursos`,
    roles : [admin],
    label : "Cursos"
  },
  users : {
    url : `${URL_FRONT}/users`,
    roles : [admin],
    label : "Usuarios"
  },
  compras : {
    url : `${URL_FRONT}/compras`,
    roles : [contador],
    label : "Compras"
  }
};

// API BACKEND
const ENDPOINT_API = {
    ot_equipos: {
        contador: `${URL_BACKEND}/ot-equipos/contador`,
        admin : `${URL_BACKEND}/ot-equipos/`,
        inspector : `${URL_BACKEND}/ot-equipos/`,
        gerente : `${URL_BACKEND}/ot-equipos/`,
    },
    ot_equipos_all : `${URL_BACKEND}/ot-equipos`,
    ot_personas: `${URL_BACKEND}/personas`,
    empresas: `${URL_BACKEND}/empresas`,
    cursos : `${URL_BACKEND}/cursos`,
    login : `${URL_AUTH}/login`,
    register : `${URL_BACKEND}/user/register`,
    logout : `${URL_AUTH}/logout`,
    users : `${URL_BACKEND}/users`,
    facturas : `${URL_BACKEND}/facturas`
};

function generateProtectedRoutes(pathFront) {
  const protectedRoutes = {};

  for (const key in pathFront) {
    const route = pathFront[key];
    if (route.url && Array.isArray(route.roles)) {
      const pathname = new URL(route.url).pathname;
      protectedRoutes[pathname] = route.roles;
    }
  }

  return protectedRoutes;
}


export { URL_FRONT, URL_BACKEND, PATH_FRONT, ENDPOINT_API, generateProtectedRoutes};
