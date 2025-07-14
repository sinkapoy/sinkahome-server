import defaultWatchConfig from './rollup.config';
import { ChildProcess, spawn } from 'child_process';


function plugin() {
    return {
        process: undefined as ChildProcess | undefined,

        async buildEnd() {
            if (this.process) {
                this.process.kill();
            }
            this.process = spawn('yarn', ['start']);
            this.process.stdout?.on('data', (data) => {
                console.log(data);
            });
            this.process.stderr?.on('data', (data) => {
                console.error(data);
            });
        }
    };
}

defaultWatchConfig[0].plugins.push(plugin());