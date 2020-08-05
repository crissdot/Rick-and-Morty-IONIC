export function getId(url: string):string{
    return url.slice(url.lastIndexOf('/')+1);
}