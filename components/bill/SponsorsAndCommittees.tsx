import { Row } from "../bootstrap"
import { External } from "../links"
import { LabeledIcon } from "../shared"
import { FC } from "../types"
import { Cosponsors } from "./Cosponsors"
import { LabeledContainer } from "./LabeledContainer"
import styles from "./SponsorsAndCommittees.module.css"
import { BillProps } from "./types"

export const SponsorsAndCommittees: FC<BillProps> = ({ bill, className }) => {
  return (
    <LabeledContainer className={className}>
      <Sponsors bill={bill} />
      <Committees bill={bill} />
    </LabeledContainer>
  )
}

const Committees: FC<BillProps> = ({ bill }) => {
  const current = bill.currentCommittee
  if (!current) return null
  return (
    <div>
      <div className="title">Committee</div>
      <div className="d-flex justify-content-around">
        <LabeledIcon
          idImage={`https://www.thefreedomtrail.org/sites/default/files/styles/image_width__720/public/content/slider-gallery/bulfinch_front.png?itok=kY2wLdnk`} // may want a better image or on our server
          mainText="Committee"
          subText={
            <External
              href={`https://malegislature.gov/Committees/Detail/${current.id}`}
            >
              {current.name}
            </External>
          }
        />
      </div>
    </div>
  )
}

const Sponsors: FC<BillProps> = ({ bill, className }) => {
  const primary = bill.content.PrimarySponsor
  const cosponsors = bill.content.Cosponsors.filter(s => s.Id !== primary.Id)
  const more = cosponsors.length > 2

  return (
    <>
      <Row className={`bg-secondary text-light ${styles.subHeader}`}>
        Sponsors
      </Row>
      <div className={className}>
        <div
          className={`
            mt-2 pb-3 d-flex justify-content-right 
            ${more ? styles.borderBottom : ""}
          `}
        >
          <LabeledIcon
            idImage={`https://malegislature.gov/Legislators/Profile/170/${primary.Id}.jpg`}
            mainText="Lead Sponsor"
            subText={
              <External
                href={`https://malegislature.gov/Legislators/Profile/${primary.Id}`}
              >
                {primary.Name}
              </External>
            }
          />

          {bill.content.Cosponsors.filter(s => s.Id !== primary.Id)
            .slice(0, 2)
            .map(s => (
              <LabeledIcon
                key={s.Id}
                idImage={`https://malegislature.gov/Legislators/Profile/170/${s.Id}.jpg`}
                mainText="Sponsor"
                subText={
                  <External
                    href={`https://malegislature.gov/Legislators/Profile/${s.Id}`}
                  >
                    {s.Name}
                  </External>
                }
              />
            ))}
        </div>
        <div className="d-flex justify-content-center">
          {more && (
            <Cosponsors bill={bill}>
              See {bill.cosponsorCount} Sponsors
            </Cosponsors>
          )}
        </div>
      </div>
    </>
  )
}
