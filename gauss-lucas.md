# Interactive contour plots of electric fields and the Gauss&ndash;Lucas theorem

Let $\mathbf{r}_1,\ldots,\mathbf{r}_n$ be distinct points in 2D space at which we have placed unit charges. The electric potential at some other point $\mathbf{r}$ in 2D space is then given by

$$
V_E(\mathbf{r})=\sum_{i=1}^n \frac{1}{|\mathbf{r}-\mathbf{r}_i|}\text{.}
$$

Drawing contour lines (using a marching squares algorithm) we obtain graphs such as the following:

GRAPH TODO

How can we characterise the zero points of $V_E$? It turns out there is a beautiful connection to complex analysis. Interpreting $\mathbf{r}_1,\ldots,\mathbf{r}_n$ as complex numbers $a_1,\ldots,a_n$, define the polynomial

$$
P(z)=(z-a_1)\cdots(z-a_n)\text{.}
$$

By the logarithmic derivative property

$$
\frac{(u_1\cdots u_m)'}{u_1\cdots u_m}=\frac{u_1'}{u_1}+\cdots+ \frac{u_m'}{u_m}
$$

we have that

$$
\frac{P'(z)}{P(z)}= \sum_{i=1}^n \frac{1}{z-a_i}
$$

and hence the zeros of $V_E$ are the roots of $P'(z)$ which are not also roots of $P(z)$.

This provides physical intuition for the **Gauss&ndash;Lucas theorem**, which states that for any complex polynomial $P$, the roots of $P'$ lie within the convex hull of $P$. If we assume $P$ is monic and $P'$ shares no roots with $P$, then this theorem is equivalent to the statement that $V_E$ can only be zero in the convex hull of the particles, which is intuitively apparent since the potential from different particles must balance out.

## blah

## Gauss&ndash;Lucas theorem

**Theorem.** For any complex polynomial $P$, the roots of $P'$ in the complex plane lie within the convex hull of the roots of $P$.

**Proof.** By the fundamental theorem of algebra we have

$$
P(z)=\alpha\prod_{i=1}^n (z-a_i)
$$

for $\alpha,a_1,\ldots,a_n\in \mathbb{C}$, where $n$ is the degree of $P$.

We recall that the convex hull of a set of points $X$ is the set of convex combinations of $X$, i.e. linear combinations with non-negative coefficients summing to $1$. Hence we need to show that any root $z$ of $P'$ can be expressed as a convex combination of $a_i$.

By the logarithmic derivative property

$$
\frac{(u_1\cdots u_m)'}{u_1\cdots u_m}=\frac{u_1'}{u_1}+\cdots+ \frac{u_m'}{u_m}
$$

we have that

$$
\frac{P'(z)}{P(z)}= \sum_{i=1}^n \frac{1}{z-a_i}\text{.}
$$

Let $z$ be a root of $P'$. If it is also a root of $P$ then we are done. Otherwise we have

$$
0=\sum_{i=1}^n \frac{1}{z-a_i}=\sum_{i=1}^n \frac{\overline{z-a_i}}{|z-a_i|^2}=\sum_{i=1}^n \frac{z-a_i}{|z-a_i|^2}
$$

and rearranging we obtain

$$
z=\sum_{i=1}^n \frac{|z-a_i|^{-2}}{\sum_{j=1}^n|z-a_j|^{-2}} a_i
$$

which is a convex combination of $a_i$ as required. $\square$

