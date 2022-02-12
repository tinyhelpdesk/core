//import { TinyHelpdeskPlugin } from '@tinyhelpdesk/base-plugin';
import { readFileSync } from 'fs';

export interface IPluginInformation {
  name: string;
  version: string;
}

export class TinyHelpdeskPluginManager {
  private _plugininfo: IPluginInformation[];

  constructor() {
    this._plugininfo = [];
  }

  public startPlugins(): void {
    console.log('startPlugins called');

    for (const plugin of this._plugininfo) {
      import('../plugins/node_modules/' + plugin.name).then((x) => {
        x.default.init();
      });
    }
  }

  public stopPlugins(): void {
    console.log('installPlugins called');

    for (const plugin of this._plugininfo) {
      import('../plugins/node_modules/' + plugin.name).then((x) => {
        x.default.stop();
      });
    }
  }

  public discoverInstalledPlugins(): void {
    console.log('discoverInstalledPlugins called');

    const packages = JSON.parse(readFileSync('plugins/package.json', 'utf-8'));

    const dependencies = packages['dependencies'];
    for (const key in dependencies) {
      this._plugininfo.push({ name: key, version: dependencies[key] });
    }

    console.log(this._plugininfo);
  }
}
