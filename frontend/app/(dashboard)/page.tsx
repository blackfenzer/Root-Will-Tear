import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { ProductsTable } from './products-table';
// import { getProducts } from '@/lib/db';
import Image from 'next/image';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const { products, newOffset, totalProducts } = await getProducts(
  //   search,
  //   Number(offset)
  // );

  return (
    // <Tabs defaultValue="all">
    //   <div className="flex items-center">
    //     <TabsList>
    //       <TabsTrigger value="all">All</TabsTrigger>
    //       <TabsTrigger value="active">Active</TabsTrigger>
    //       <TabsTrigger value="draft">Draft</TabsTrigger>
    //       <TabsTrigger value="archived" className="hidden sm:flex">
    //         Archived
    //       </TabsTrigger>
    //     </TabsList>
    //     <div className="ml-auto flex items-center gap-2">
    //       <Button size="sm" variant="outline" className="h-8 gap-1">
    //         <File className="h-3.5 w-3.5" />
    //         <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
    //           Export
    //         </span>
    //       </Button>
    //       <Button size="sm" className="h-8 gap-1">
    //         <PlusCircle className="h-3.5 w-3.5" />
    //         <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
    //           Add Product
    //         </span>
    //       </Button>
    //     </div>
    //   </div>
    //   <TabsContent value="all">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Meniscus Root Tear</h1>

          {/* Image */}
          <Image
            src="/state.webp"
            width={500}
            height={500}
            alt="State of meniscus root tear"
            className="rounded-lg mb-4"
          />

          {/* Description */}
          <p className="mt-2">
            The meniscus is a fibrocartilaginous structure in the knee that
            plays a crucial role in joint function. It provides several key
            benefits, including:
          </p>

          <ul className="list-disc pl-6 mt-2">
            <li>Distributing load to the knee</li>
            <li>Increasing stability of the tibiofemoral articulation</li>
            <li>Lubricating the knee joint</li>
            <li>Providing nutrients to the joint</li>
            <li>Strong shock absorption</li>
          </ul>

          <p className="mt-4">
            Without the meniscus, the load on the articular cartilage increases,
            leading to the progression of osteoarthritis. One of the tear
            patterns that has become increasingly important is the meniscus root
            tear. This type of injury is notable due to its rapid progression of
            osteoarthritis, similar to the effects of a total meniscectomy.
            Early detection and treatment are critical for improving the
            patient's outcome.
          </p>

          {/* Types of Meniscus Root Tears */}
          <h2 className="text-xl font-semibold mt-4">
            Types of Meniscus Root Tears
          </h2>

          <p className="mt-2">
            Meniscus root tears can be classified into different types based on
            the severity and pattern of the tear:
          </p>

          <ul className="list-decimal pl-6 mt-2">
            <li>
              <strong>Type I:</strong> Partial stable root tear
            </li>
            <li>
              <strong>Type II:</strong> Complete radial tear within 9 mm from
              the bony root attachment
            </li>
            <li>
              <strong>Type III:</strong> Bucket-handle tear with complete root
              detachment
            </li>
            <li>
              <strong>Type IV:</strong> Complex oblique or longitudinal tear
              with complete root detachment
            </li>
            <li>
              <strong>Type V:</strong> Bony avulsion fracture of the root
              attachment
            </li>
          </ul>

          {/* Conclusion */}
          <h2 className="text-xl font-semibold mt-4">Conclusion</h2>

          <p className="mt-2">
            The incidence of medial meniscus root tears has increased due to a
            better understanding by physicians and improved access to diagnostic
            tools like MRI. The root of the meniscus plays a critical role in
            maintaining the stability of the entire meniscus. A meniscus root
            tear disrupts the hoop stress function of the knee, which can lead
            to early-onset osteoarthritis.
          </p>

          <p className="mt-2">
            Most meniscus root tears occur in adults due to minor trauma, such
            as squatting or sitting. A "pop" sound is commonly reported during
            the injury. MRI is the investigation of choice due to its high
            sensitivity and specificity. Key MRI findings include cleft sign,
            ghost sign, and medial meniscus extrusion. A high index of suspicion
            is necessary for diagnosis, and confirmation comes through imaging.
          </p>

          <p className="mt-2">
            Early detection of meniscus root tears is crucial, as delayed
            diagnosis leads to greater meniscal extrusion and cartilage damage.
            Nonoperative treatments may alleviate pain and swelling in the short
            term, but they do not address the root cause. Meniscus root repair
            is recommended for acute tears or mild degeneration of the knee.
            Early treatment can prevent meniscal extrusion and reduce the
            likelihood of knee replacement.
          </p>

          <p className="mt-2">
            Additionally, biologic treatments show promise in enhancing meniscus
            repair, though further studies are needed to fully understand their
            role.
          </p>
        </div>
    //   </TabsContent>
    // </Tabs>
  );
}
