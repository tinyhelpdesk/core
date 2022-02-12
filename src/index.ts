import { TinyHelpdeskPluginManager } from './TinyHelpdeskPluginManager';

const test = new TinyHelpdeskPluginManager();
test.discoverInstalledPlugins();
test.startPlugins();
test.stopPlugins();
