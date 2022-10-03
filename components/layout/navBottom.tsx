import {
  Center,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import { navItems } from "navigation"
import { useRouter } from "next/router"

export default function NavBottom() {
  const router = useRouter()
  return (
    <>
      <Center h="100%">
        <HStack>
          {navItems.map(item => (
            <LinkBox key={item.route}>
              <LinkOverlay href={item.route}>
                <VStack w="100px">
                  <Icon
                    color="white"
                    w={6}
                    h={6}
                    as={
                      router.pathname === item.route
                        ? item.iconSelected
                        : item.icon
                    }
                  />
                  <Text fontSize="sm" color="white">
                    {item.name}
                  </Text>
                </VStack>
              </LinkOverlay>
            </LinkBox>
          ))}
        </HStack>
      </Center>
    </>
  )
}
