import { MongoClient } from 'mongodb';

declare global {
    // globalにカスタムプロパティを追加するための宣言
    // 型は Promise<MongoClient> または undefined
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export { };