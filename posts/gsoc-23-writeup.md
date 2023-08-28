---
title: 'GSoC 2023: VVC Decoder Improvements'
date: '2023-08-27'
---
This summer I contributed to [FFmpeg](https://ffmpeg.org/) as part of the Google Summer of Code. Specifically, I worked on FFmpeg's decoder for the Versatile Video Coding (VVC) codec, also known as H.266. It is the sucessor to HEVC/H.265 and AVC/H.264.

While contributing as part of the Google Summer of Code, the decoder had not yet been merged into FFmpeg master. We staged changes at [https://github.com/ffvvc/FFmpeg](https://github.com/ffvvc/FFmpeg) before submitting them to the FFmpeg-devel mailing list for review. Although not in mainline, the decoder was largely feature-complete.

The improvements to be made to the decoder fell into two camps: implementing some of the more esoteric features of the standard, and increasing the performance of the decoder. In my proposal I identified three deliverables I could produce in aid of these objectives:
1. Support for the higher bit-depths enabled in version 2 of the standard.
2. Support for VVC's Intra-Block Copy (IBC) feature.
3. AVX2 assembly optimisations for the decoder's inverse transforms.

Early in the project, my mentor and I decided to prioritise 1. and 3. over 2. as these, in particular the transform speed, were more important in the uptake of the decoder.

---
## Higher Bit-Depth Support

Firstly, I made [the minimum changes necessary to facilitate the higher bit-depths](https://github.com/ffvvc/FFmpeg/pull/84). This was straightforward, however served as a good introduction to the structure of the decoder, how it integrates into FFmpeg and some new tools such as a YUV viewer.

While this is technically all that is needed to support the higher bit-depths, in practice most encoders will likely choose to use a feature of VVCv2 called the range extension in order to make the most of the increased bit-depths. This enables storing the transform coefficients with a greater precision, among other things. My work implementing the range extension can be found [here](https://github.com/ffvvc/FFmpeg/pull/91). This required changes throughout the decoder, but on the whole they were again relatively straightforward. While working on this, I particularly enjoyed using [`git bisect`](https://git-scm.com/docs/git-bisect) to identify a regression I introduced.

---
## Finding an Error in the Standard

Conformance to the standard is tested using a set of [example bitstreams and hashes of the correct decoded output](https://www.itu.int/wftp3/av-arch/jvet-site/bitstream_exchange/). This can be used to ensure bit-exact decoding. The FFVVC staging repository includes GitHub Actions workflows to perform these tests continuously, something I also did some work on.

While implementing the support for the higher bit-depths, I noticed all the tests for videos using 4:4:4 chroma subsampling were failing. This was curious as none of the changes I had made touched the subsampling really. The decoded videos had subtle but noticable colourful aberrations.

<img src="/ffvvc-inter-prediction-fault-example.png" width=100% />

<!-- I used the difference mode in [YUView](https://github.com/IENT/YUView) to compare the output of our decoder with that from the VVC Test Model (VTM), a reference implementation of the decoder. This revealed that there was no difference between the two on the first frame. Additionally, the aberrations were more pronounced in areas of higher motion. These facts both pointed to a flaw in the inter-prediction code. I looked back and discovered that most of the lower bit-depth 4:4:4 test bitstreams are entirely intra-coded and the small number which did use inter-predication were failing — the fact I had uncovered the bug while working on the higher bit-depths was a red herring! -->

<!-- <img src="/ffvvc-inter-prediction-fault-difference.png" width=100% /> -->

<!-- TODO: intra vs inter -->

To help locate the bug, I used the YUV viewer's difference view to locate a particular coding tree unit (CTU) which exhibited the problem. I took note of its X and Y location and the output order of the problematic CTU. I then used these to step through FFVVC and VTM, using elaborate conditional breakpoints to inspect the workings of both while decoding that particular CTU. This revealed that the two decoders derived a different chroma intra prediction mode to one another.

Try as I might, when working through by hand I could not see why VTM was deriving the mode it was. I tried looking at the parameters to the process to ensure these were being derived correctly, but it appeared they were and any changes to them would have knock-on effects elsewhere — it was only in this very specific location that the decoders differed at all from one another and from the specification. Based on this, we filed a [ticket](https://jvet.hhi.fraunhofer.de/trac/vvc/ticket/1602) with the JVET, which has resulted in a correction which will be issued in version 3 of VVC. Using the correction, I was able to implement [a fix](https://github.com/ffvvc/FFmpeg/pull/90) in FFmpeg's decoder.

---
I would like to say thank you to everyone at FFmpeg and in particular my mentor Nuo Mi for facilitating this project. I've thoroughly enjoyed it and learnt a lot.

