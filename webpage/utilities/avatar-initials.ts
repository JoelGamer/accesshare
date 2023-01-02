export const avatarInitials = (name: string) => {
  return name.trimEnd().split(' ').reduce<string>((returnName, currentName, index) => {
    if (index === 0) return currentName[0];
    if (returnName.length === 1) return `${returnName}${currentName[0]}`;
    return `${returnName.slice(0, 1)}${currentName[0]}`;
  }, '');
};