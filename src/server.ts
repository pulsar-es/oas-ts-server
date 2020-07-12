import run from '@/cli/run';
import app from './app';
import appCli from './app.cli';
import config from './config';

const cliInput = appCli();
const PORT = cliInput.port || config.port;

app()
    .then((expressApp) => {
        if (cliInput['run-script']) {
            // call the script runner
            run(cliInput['run-script']);
        } else {
            // Start listening for incoming HTTP requests
            expressApp.listen(PORT, () => {
                console.log(`server listening on port, ${PORT}`);
            });
        }
    })
    .catch((e) => {
        console.error('Error calling the app:');
        throw e;
    });
