import {
  Center,
  Grid,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import { getNavBarElements } from "navigation"
import { useRouter } from "next/router"

export default function NavBottom() {
  const router = useRouter()
  return (
    <>
      <Center h="100%">
        <Grid
          w="100%"
          templateColumns={`repeat(${getNavBarElements().length},1fr)`}
        >
          {getNavBarElements().map(item => (
            <Center key={item.route}>
              <LinkBox>
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
                    <Text fontSize="xs" color="white">
                      {item.name}
                    </Text>
                  </VStack>
                </LinkOverlay>
              </LinkBox>
            </Center>
          ))}
        </Grid>
      </Center>
    </>
  )
}
