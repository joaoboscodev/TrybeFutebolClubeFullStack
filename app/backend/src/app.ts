import * as express from 'express';
import TeamsController from './controllers/teams.controller';
import UsersController from './controllers/users.controller';
import tokenValidation from './middlewares/tokenValidation';
import router from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/teams', TeamsController.getAll);
    this.app.get('/teams/:id', TeamsController.getById);

    this.app.get('/login/role', tokenValidation.isTokenValid, UsersController.loginRole);
    this.app.post('/login', UsersController.login);

    this.app.use(router);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
