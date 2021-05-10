


const settings = config();

export default app => {

    app.disable('x-powered-by');
    app.set('env', settings.parsed.ENV);
    app.set('config', settings.parsed);
    app.locals.env = app.get('env');
    app.locals.config = app.get('config');
    app.use(logger('combined'));

    app.use(cors());
 }

