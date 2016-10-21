import * as path from "path";
import * as sass from "sass.js";
import { inject, Queue, CSS_MIME_TYPE } from "@tandem/common";

import { parseCSS, evaluateCSS, SyntheticWindow, CSSExpression } from "@tandem/synthetic-browser";
import {
  Bundle,
  FileCache,
  IFileResolver,
  IBundleLoader,
  IBundleLoaderResult,
  FileCacheDependency,
  FileResolverDependency,
} from "@tandem/sandbox";




const _queue = new Queue();

// TODO - SCSSTransformer
export class SCSSLoader implements IBundleLoader {

  @inject(FileCacheDependency.NS)
  private _fileCache: FileCache;

  @inject(FileResolverDependency.NS)
  private _fileResolver: IFileResolver;

  async load(bundle: Bundle, { type, value }): Promise<any> {

    // need to shove sass loader in a queue since it's a singleton.
    return _queue.add(() => {
      sass.importer(async (request, done) => {
        console.log(request.current, bundle.filePath);
        const filePath = request.path || await this._fileResolver.resolve(request.current, path.dirname(bundle.filePath), {
          extensions: [".scss", ".css"],
          directories: []
        });
        const content = await (await this._fileCache.item(filePath)).read();
        done({ path: filePath, content: content || " " });
      });

      return new Promise((resolve, reject) => {
        sass.compile(value, {}, (result) => {
          // 3 = empty string exception
          if (result.status !== 0 && result.status !== 3) return reject(result);
          resolve({
            type: CSS_MIME_TYPE,
            map: result.map,
            ast:  parseCSS(result.text || " ", result.map),
            value: result.text || " "
          } as IBundleLoaderResult);
        });
      });
    });
  }
}
