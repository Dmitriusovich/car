import { ClassNameValue, extendTailwindMerge, getDefaultConfig, mergeConfigs } from "tailwind-merge"
import { twJoin } from "tailwind-merge"

const customTwMerge = extendTailwindMerge(() => {
  const config = getDefaultConfig()

  return mergeConfigs(config, {
    extend: {
      classGroups: {
        square: [{ sq: config.theme.space }],
      },
      conflictingClassGroups: {
        square: ["w", "h"],
      },
    },
  })
})

export const merge = (...args: ClassNameValue[]) => customTwMerge(args)
export const join = (...args: ClassNameValue[]) => twJoin(args)
