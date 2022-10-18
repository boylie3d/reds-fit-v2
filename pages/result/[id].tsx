import { Comment, Profile, Result, Workout } from "@/types"
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import { useComments } from "hooks/comment"
import { useLocalProfile, useProfile } from "hooks/profile"
import { GetServerSideProps, NextPage } from "next"
import { get as profileGet } from "pages/api/profile/[id]"
import { get as resultGet } from "pages/api/result/[id]"
import { get as commentGet } from "pages/api/result/[id]/comment"
import { get as fistbumpGet } from "pages/api/result/[id]/fistbump/[fbId]"
import { get as workoutGet } from "pages/api/workout/[id]"

interface Props {
  result: Result
  profile: Profile
  workout: Workout
}

const ResultPage: NextPage<Props> = ({ result, profile, workout }: Props) => {
  const { comments, loading, error } = useComments(result.id || "")

  const tmp = () => {
    const now = new Date()
    const comment: Comment = {
      userId: "UpKYkVJKXzQww0HiE88q6nD65mP2",
      created: now,
      updated: now,
      message:
        "working out is very good for your mind and your health praise be unto morth almighty amen",
    }

    fetch(`/api/result/${result.id}/comment`, {
      method: "POST",
      body: JSON.stringify(comment),
    })
  }
  return (
    <AppLayout>
      <Button onClick={tmp}>test</Button>
      <VStack gap={3} pt={4}>
        <HStack w="100%">
          <Link href={`/profile/${profile.uid}`}>
            <Avatar src={profile.photoURL} />
          </Link>
          <Text>
            <Link href={`/profile/${profile.uid}`}>{profile.displayName}</Link>
            {` logged a result on the "${workout.title}" workout`}
          </Text>
        </HStack>
        <Box w="100%">
          <ResultHeader result={result} />
        </Box>
        <Box w="100%">
          <Text>{result.description}</Text>
        </Box>
        <Divider />
        <CommentBox comments={comments} />
      </VStack>
    </AppLayout>
  )
}

interface ResultProps {
  result: Result
}

const ResultHeader = ({ result }: ResultProps) => {
  return (
    <Box h="80px" w="100%" bgColor="gray.300">
      <Center h="100%">
        <Text fontSize="2xl">{result.value}</Text>
      </Center>
    </Box>
  )
}

interface CommentsProps {
  comments: Comment[] | undefined
}

const CommentBox = ({ comments }: CommentsProps) => {
  if (!comments) return <LoadingPane />
  return (
    <Box w="100%">
      <VStack gap={3}>
        {comments.map(c => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </VStack>
    </Box>
  )
}

interface CommentProps {
  comment: Comment
}
const CommentItem = ({ comment }: CommentProps) => {
  const {
    profile: lProfile,
    loading: lLoading,
    error: lError,
  } = useLocalProfile()
  const { profile, loading, error } = useProfile(comment.userId)

  if (lLoading || lLoading) return <LoadingPane />
  if (!profile || !lProfile) return <div />

  return (
    <HStack w="100%">
      <Link href={`/profile/${profile.uid}`}>
        <Avatar size="sm" src={profile.photoURL} />
      </Link>
      <Box bgColor="gray.200" w="100%" borderRadius={5}>
        <Link href={`/profile/${profile.uid}`}>
          <Text>{profile.displayName}</Text>
        </Link>
        <Text fontSize="sm">{comment.message}</Text>
        <>
          {profile.uid === lProfile.uid && (
            <Flex w="100%">
              <Box flex={1}>hi</Box>
              <Box flex={1}>there</Box>
            </Flex>
          )}
        </>
      </Box>
    </HStack>
  )
}

//TODO: swr stuff? maybe?
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query
  const idStr = id ? id.toString() : ""
  const result = await resultGet(idStr)
  const profile = await profileGet(result.userId)
  const workout = await workoutGet(result.workoutId)
  const fistbumps = await fistbumpGet(idStr)
  const comments = await commentGet(idStr)

  return {
    props: {
      result: result,
      profile: profile,
      workout: workout,
      fistbumps: fistbumps,
      comments: comments,
    },
  }
}

export default ResultPage