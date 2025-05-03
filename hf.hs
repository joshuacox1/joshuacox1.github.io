import Data.List (maximumBy, intercalate)
import Data.Function (on)
import Data.Bits (testBit)
import Math.NumberTheory.Logarithms (integerLog2)

pow :: [a] -> [[a]]
pow xs = case xs of
  []  -> [[]]
  x:xs -> let r = pow xs in r ++ (map (x:) r)

data L = R [L] deriving (Eq)

instance Show L where
  show (R x) = "{" ++ (intercalate "," $ map show x)  ++ "}"

instance Ord L where
  compare = on compare ack

ack :: L -> Integer
ack (R x) = sum (map (\y -> 2^(ack y)) x)

inv_ack :: Integer -> L
inv_ack i =
  let top = if i == 0 then -1 else integerLog2 i in
  let bits = filter (\j -> testBit i j) [top,top-1..0] in
  R $ map inv_ack $ map toInteger bits

rank :: L -> Integer
rank (R x) = case x of
  [] -> 0
  _ -> 1 + (maximum $ map rank x)
